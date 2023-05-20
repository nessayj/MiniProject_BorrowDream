
import Card from "./data/Card";



const Carrier = ()=>{

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return(
    <>
        <h1>케리어</h1>
        <Card categoryNo={1001} />
        <div className="goTop">
        <button onClick={goToTop}>맨위로</button>
        </div>
  </>
  )

};
export default Carrier

