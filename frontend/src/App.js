import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
          <img src="jeacsLogo.PNG" width="70" height="70" alt=""></img>
        </a>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ml-auto">
            <a class="nav-item nav-link active" href="#">Sign In <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link" href="#">Log In</a>
            <a class="nav-item nav-link" href="#">Games</a>
          </div>
        </div>
      </nav>

      <div class="container">
        <div class="News">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="games.jpg" alt="First slide"></img>
                  <div class="carousel-caption d-none d-md-block">
                    <h5>Welcome to JEAC'S</h5>
                    <p>JEAC'S is a web page that allows people to play browser games for free. You can create an
                      account to climb up the rankings and become the best in the world!</p>
                  </div>
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="valo.jfif" alt="Second slide"></img>
                  <div class="carousel-caption d-none d-md-block">
                    <h5>Shooter games</h5>
                    <p>Do you like shooter games? You think you are the best among your friends. Prove it in
                      JEAC'S. We have a huge amount of games where you can proof your value.</p>
                  </div>
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="mhw.png" alt="Third slide"></img>
                  <div class="carousel-caption d-none d-md-block">
                    <h5>Monster hunting</h5>
                    <p>If you prefer adventuring alone into unknown places this game is the one for you. Explore
                      the jungle and find who is behind the strange sounds</p>
                  </div>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div class="ListGames"></div>
      </div>
    </div>
  );
}

export default App;
