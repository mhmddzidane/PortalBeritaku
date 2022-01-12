import Container from "./components/Container";
import Navbar from "./components/Navbar";
import {useState, useEffect} from 'react'
import { getNews } from "./services/getNews";
import Loading from "./components/Loading";
import Error from "./components/Error";
import NewsList from "./components/NewsList";

function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchTechNews = async () => {
      setLoading(true)

      const res = await getNews({
        searchQuery: 'microsoft'
      })
      
      if(!res){
        setLoading(false)
        setError(true)

        return
      }

      setLoading(false)
      setArticles(res.articles)

    }
    
    fetchTechNews()

  }, [])

  return (
    <>
      <Navbar/>
      <Container>
        {loading && <Loading/>}
        {error && <Error/>}
        {(!loading && articles.length > 0) && (
          <NewsList articles={articles}/>
        )}
      </Container>
    </>
  );
}

export default App;
