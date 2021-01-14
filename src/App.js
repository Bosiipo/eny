import { useState, useEffect } from "react";
import style from './App.module.css';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row, Col, Spinner } from "reactstrap";
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import Data from './components/Data';
import {gender,paymentMethod} from './filterData';
import axios from 'axios';
import Pagination from './components/Pagination';


const App = () => {
  const [users, setUsers] = useState([{}]);
  const [cardsPerPage, setCardsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [ErrorMessage, setErrorMessage] = useState('');  //to work on
  const [filterValue, setFilterValue] = useState('');
  const [data, setData] = useState([{}]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentUsers = data?.slice(indexOfFirstCard, indexOfLastCard);

  const fetchData = async () => {
    await axios.get('https://api.enye.tech/v1/challenge/records')
    .then((res) => {
      setUsers(res.data.records.profiles);
      setData(res.data.records.profiles);
    })
    .catch(e => console.log(e));
  }

  useEffect(() => {
    fetchData();
  }, []);


  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchForPatient = (query) => {
    let arr = [];
    users.filter((user, index) => {
      let name = `${user?.FirstName.toLowerCase()} ${user?.LastName.toLowerCase()}`;
      if(name.includes(query)){
        arr.push(user);
      }
    });
    console.log(arr);
    return setData(arr);
  }


  const updateGender = (e) => {
    let arr = [];
    return users?.filter((user) => {
      if (user?.Gender?.toLowerCase() === e.target.value?.toLowerCase()) {
        arr.push(user);
      }
      return setData(arr);
    })
  }

  const updatePaymentMethod = (e) => {
    let arr = [];
    return users?.filter((user) => {
      if (user?.PaymentMethod?.toLowerCase() === e.target.value?.toLowerCase()) {
        arr.push(user);
      }
      return setData(arr);
    })
  }


  return (
    <div className={style["App"]}>
      <h1 className="pt-4">Records API</h1>
      <Container className="">
        <div className={style["header"]}>
          <SearchBar 
            handleSearch={(e) => searchForPatient(e.target.value)}
          />
          <div className={style["filters"]}>
            <Filter data={gender} filterBy="Gender" value={filterValue} updateFilter={updateGender} />
            <Filter data={paymentMethod} filterBy="Payment method" value={filterValue} updateFilter={updatePaymentMethod} />


            


          </div>
        </div>
      </Container>


      <Container className={style["data__container"]}>
        <Row className={style["roww"]}>
        {data?.length !== 0 ?
          <>
            {currentUsers?.length === 0 ? <Spinner className="d-flex justify-content-center m-auto" style={{color: "#6dc77a"}}/> : currentUsers?.map((user, index) => (
              <Col key={index} md={4} className={style["parent__col"]}>
                <Data user={user} />
              </Col>
            ))}
          </> : 
          <h3 style={{
            margin: "auto"
          }}>User data not available</h3>
        }
        </Row>
      </Container>

      <Container>
        <Pagination 
          totalCards={users.length}
          cardsPerPage={20}
          current={currentPage}
          changePage={changePage}
        />
      </Container>
    </div>
  );
}

export default App;


// <InfiniteScroll
//         dataLength={20}
//         next={this.fetchMoreData}
//         style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
//         inverse={true} //
//         hasMore={true}
//         loader={<h4>Loading...</h4>}
//         scrollableTarget="scrollableDiv"
//       ></InfiniteScroll>

// <div className="d-flex flex-column">
//               <p>Filter by: Gender </p>
//             </div>
//             <div className="d-flex flex-column">
//               <p>Filter by: Payment Method</p>
//             </div>
