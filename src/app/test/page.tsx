import './test.css'

const TestPage = () => {
  return (
    <div className="cards">
      <div className="card">
        <img src="hotel.jpg" alt=""/>
        <div className="info">
          <h3>Hotel</h3>
          <p>5 stars</p>
          <div className="actions">
            <button>Details</button>
            <button>Book</button>
          </div>
        </div>
      </div>
      <div className="card">
        <img src="hotel.jpg" alt=""/>
        <div className="info">
          <h3>Hotel</h3>
          <p>5 stars</p>
          <div className="actions">
            <button>Details</button>
            <button>Book</button>
          </div>
        </div>
      </div>
      <div className="card">
        <img src="hotel.jpg" alt=""/>
        <div className="info">
          <h3>Hotel</h3>
          <p>5 stars</p>
          <div className="actions">
            <button>Details</button>
            <button>Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;