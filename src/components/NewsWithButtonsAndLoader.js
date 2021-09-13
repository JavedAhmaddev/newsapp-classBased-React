import React, { Component } from 'react'
import Newsitem from '../Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class NewsWithButtonsAndLoader extends Component {

    static defaultProps={

        country:'in',
        pagesize:'6',
        category:'general',

    }
    static propTypes ={
        country:PropTypes.string.isRequired,
        pagesize:PropTypes.number.isRequired,
        category:PropTypes.string,
    }

    capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)}- NewsMonkey`
    }

    update= async ()=>{

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2901efb079e489aa2def45c28a44daa&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    async componentDidMount() {

        this.update();

    }

    handleNextClick = async () => {

        this.setState({
            page:this.state.page+1,
        })
        this.update();

        

    }

    handlePrevClick = async () => {

        this.setState({
            page:this.state.page-1,
        })
        this.update()

       
    }


    render() {
        return (

            <div className="container my-3">

                <h1 className="text-center my-3" style={{color:"blue"}} > NewsMonkey-Top {this.capitalizeFirstLetter(this.props.category)} Headline</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                {!this.state.loading && this.state.articles && this.state.articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                        <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 90) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </div>
                })}
            </div>

            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} id="b1" type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>


        </div>

        )
    }
}

export default NewsWithButtonsAndLoader
