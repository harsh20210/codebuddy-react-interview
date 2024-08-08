import "./commonStyle.css";
export default function Carddesign({ number = 0, title = "No Title" }) {
  return (
    <div className="container--card">
      <h2>{title}</h2>
      <div className="container--card__styleForCard">
        <div className="container--card__innerContent">{number}</div>
      </div>
    </div>
  );
}
