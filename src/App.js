import './styles/main.css';
import { getUsers } from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(3);
  const [totalPages, setTotalPages] = useState([]);
  const page = useRef(1);
  const { loading, users } = useSelector(state => state.User);

  const pageNumberHandler = pagenumber => {
    page.current = pagenumber;
    dispatch(getUsers(page.current, pageSize));
  };
  const nextButtonHandler = () => {
    if (totalPages.length === page.current) {
      page.current = totalPages.length;
      dispatch(getUsers(page.current, pageSize));
    } else dispatch(getUsers(page.current++, pageSize));
  };

  const prevButtonHandler = () => {
    if (page.current < 1) {
      dispatch(getUsers(1, pageSize));
    } else dispatch(getUsers(page.current--, pageSize));
  };

  const showPageNUmbers = useCallback(() => {
    let pages = [];
    if (!loading && users) {
      for (let i = 0; i < users?.total_pages; i++) {
        pages.push(i + 1);
      }
    }
    setTotalPages(pages);
  }, [loading, users]);

  useEffect(() => {
    showPageNUmbers();
  }, [showPageNUmbers]);

  useEffect(() => {
    dispatch(getUsers(page.current, pageSize));
  }, [dispatch, pageSize]);

  return (
    <div className="App">
      <div className="container">
        <p className="alphabets">FIND BY ALPHABETS</p>
        <div className="alphabetBtn" id="alphabetBtn">
          <a href="#">A</a>
          <a href="#">B</a>
          <a href="#">C</a>
          <a href="#">D</a>
          <a href="#">E</a>
          <a href="#">F</a>
          <a href="#">G</a>
          <a href="#">H</a>
          <a href="#">I</a>
          <a href="#">J</a>
          <a href="#">K</a>
          <a href="#">L</a>
          <a href="#">M</a>
          <a href="#">N</a>
          <a href="#">O</a>
          <a href="#">P</a>
          <a href="#">Q</a>
          <a href="#">R</a>
          <a href="#">S</a>
          <a href="#">T</a>
          <a href="#">U</a>
          <a href="#">V</a>
          <a href="#">W</a>
          <a href="#">X</a>
          <a href="#">Y</a>
          <a href="#">Z</a>
        </div>
        <div className="sortArea">
          <div className="select">
            Show
            <span>
              <select
                id="tableSizeSelect"
                className="tableSizeSelect"
                onChange={e => {
                  page.current = 1;
                  setPageSize(e.target.value);
                }}
                value={pageSize}
              >
                <option value="3">3</option>
                <option value="6">6</option>
              </select>
            </span>
            entries
          </div>
          <div className="sort-btn">
            <button id="sortByName" className="sortByName">
              sort by name
            </button>
            <button id="sortByOddId" className="sortByOddId">
              odd ID
            </button>
            <button id="sortByEvenId" className="sortByEvenId">
              even ID
            </button>
          </div>
        </div>
        {loading ? (
          <p>..loading</p>
        ) : (
          <div>
            <div className="table-container">
              <table className="table" id="table">
                <thead id="tbody">
                  <tr>
                    <th>id</th>
                    <th>email</th>
                    <th>firstname</th>
                    <th>lastname</th>
                    <th>img</th>
                  </tr>
                </thead>
                <tbody id="listingTable">
                  {users?.data?.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td className="avatar">
                        <img src={user.avatar} alt="" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pgSetup" id="pgSetup">
              <div className="page" id="pgNumbers"></div>
              <div className="pagination" id="pagination">
                <span className="pageButton outline-none" id="button_prev" onClick={prevButtonHandler}>
                  Prev
                </span>
                {totalPages &&
                  totalPages.map((p, index) => (
                    <span id="page_number" className="page-number" onClick={() => pageNumberHandler(p)} key={index}>
                      {p}
                    </span>
                  ))}
                <span className="pageButton outline-none" id="button_next" onClick={nextButtonHandler}>
                  Next
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
