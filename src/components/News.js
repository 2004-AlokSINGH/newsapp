import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";

import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)

  

  const cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


   const updateNews=async()=> {
    props.setProgress(0)



    // https://newsapi.org/v2/everything?q=tesla&from=2023-07-10&sortBy=publishedAt&apiKey=df932a8bbfd54ed6acf41d9ea6e56894
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles)
    setLoading(false)
    settotalResults(parsedData.totalResults)


    // this.setState({
    //   articles: parsedData.articles,
   
    //   loading: false,
    //   totalResults: parsedData.totalResults,
    // });
    props.setProgress(100)
  }

  useEffect(()=>{
      document.title = `${cap(props.category)} - NewsMonkey`;
    updateNews()

    // eslint-disable-next-line 
  },[])

  // async componentDidMount() {
  // //   // let url =
  // //   //   `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=df932a8bbfd54ed6acf41d9ea6e56894&page=1&pageSize=${props.pageSize}`;
  // //   // this.setState({loading:true})
  // //   // let data = await fetch(url);
  // //   // let parsedData = await data.json();
  // //   // console.log(parsedData );
  // //   // this.setState({
  // //   //   articles: parsedData.articles,
  // //   //   totalResults: parsedData.totalResults,
  // //   //   loading:false
  // //   // });
  // //   this.updateNews();
  // }


  // const handleNext = async () => {
  //   // console.log("Next")
  //   // if (this.state.page+1>  Math.ceil(this.state.totalResults / props.pageSize)) {

  //   // }else{
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=df932a8bbfd54ed6acf41d9ea6e56894&page=${
  //   //     this.state.page + 1
  //   //   }&pageSize=${props.pageSize}`;
  //   //   this.setState({loading:true})
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();
  //   //      this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parsedData.articles,
  //   //     loading:false

  //   // })
  //   // setState({ page: this.state.page + 1 });
  //   setPage(page+1)

  //   updateNews();
  // };

  // const handlePrev = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=df932a8bbfd54ed6acf41d9ea6e56894&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${props.pageSize}`;
  //   // this.setState({loading:true})
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading:false
  //   // });

  //   // this.setState({ page: this.state.page - 1 });
  //   setPage(page-1)
  //   updateNews();
  // };

  const fetchMoreData = async() => {
    // this.setState({page:this.state.page+1})
  
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    setLoading(false)
    // this.setState({
    //   articles: this.state.articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //   loading: false,
      
    // });


  };


    return (
      <>
        <h1 className="text-center" style={{margin:'35px 0px', marginTop:'95px'}}  >
          
          Top {cap(props.category)} Headlines
        </h1>
        {loading && <Spinner></Spinner>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner></Spinner>}
        >
          <div className="container">
            <div className="row">
            {articles.map((e) => {
              return (
                <div className="col-md-4" key={e.url}>
                  <NewsItem
                    title={e.title ? e.title.slice(0, 45) : " "}
                    description={
                      e.description ? e.description.slice(0, 88) : " "
                    }
                    imageUrl={e.urlToImage}
                    newsUrl={e.url}
                    author={e.author}
                    date={e.publishedAt}
                    source={e.source.name}
                  ></NewsItem>
                </div>
              );
            })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrev}
            className="btn btn-dark"
          >
            &larr; Prev
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            onClick={this.handleNext}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  
}



News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
