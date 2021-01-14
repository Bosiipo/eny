import React, {useEffect} from 'react';

const Pagination = ({ totalCards, cardsPerPage, changePage, current }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
      pageNumbers.push(i);
    };

    useEffect(() => {
        const setActiveClass = () => {
            let li = document.querySelectorAll('li');
            li.forEach(element => {
                if (element.innerText == current) {
                    element.classList.add('active');
                } else{
                    element.classList.remove('active');
                }
            });
        }
        setActiveClass();
    });

    // console.log('current ==>', current);
   
    return (
        <ul className="pagination mt-5 mb-5 justify-content-center" style={{width: "100%"}}>
            {pageNumbers.map(number => (
                <li key={number} className="page-item">
                    <a onClick={() => changePage(number)} className="page-link">
                        {number}
                    </a>
                </li>
            ))}
        </ul> 
    )
}

export default Pagination;
