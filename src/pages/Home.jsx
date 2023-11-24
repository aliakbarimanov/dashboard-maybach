// import images
import BackgroundImage from "../assets/images/background.webp";

const Home = () => {
    return (
        <div className="hero">
            <div className="container">
                <div className="row">
                    <div className="backgroundImg">
                        <img src={BackgroundImage} alt="Background img" />
                    </div>
                    <h2 className="heroTitle">Welcome Maybach shopping dashboard</h2>
                </div>
            </div>
        </div>
    )
}

export default Home;