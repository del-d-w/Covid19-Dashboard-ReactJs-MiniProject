import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FaqsList from '../FaqsList'
import FactsList from '../FactsList'
import './index.css'

class About extends Component {
  state = {
    isLoading: true,
    faqData: {},
    factsData: {},
  }

  componentDidMount() {
    this.getAllAboutData()
  }

  renderloader = () => (
    <>
      <div className="loader-container" testid="aboutRouteLoader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  getAllAboutData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const updateFactoidsData = data.factoids.map(each => ({
        banner: each.banner,
        id: each.id,
      }))
      const updateFaqsData = data.faq.map(each => ({
        answer: each.answer,
        category: each.category,
        qno: each.qno,
        question: each.question,
      }))

      this.setState({
        faqData: updateFaqsData,
        factsData: updateFactoidsData,
        isLoading: false,
      })
    } else {
      console.log('data not available')
    }
  }

  renderAllData = () => {
    const {faqData, factsData} = this.state
    return (
      <>
        <ul testid="faqsUnorderedList" className="factlist">
          {faqData.map(each => (
            <FaqsList
              key={each.qno}
              answer={each.answer}
              question={each.question}
            />
          ))}
        </ul>

        <h1 className="about-vaccine-title">Facts</h1>
        <ul className="factlist">
          {factsData.map(each => (
            <FactsList key={each.id} banner={each.banner} />
          ))}
        </ul>
      </>
    )
  }

  //   renderFactsData = () => {
  //     const {factsData} = this.state
  //     return (
  //       <>

  //         {factsData.map(each => (
  //           <FactsList key={each.id} banner={each.banner} />
  //         ))}
  //       </>
  //     )
  //   }

  render() {
    const {isLoading} = this.state
    return (
      <div className="main-container">
        <Header />
        <div className="container">
          <div className="about-container">
            <h1 className="about-title">About</h1>
            <p className="about-description">Last update on march 28th 2021.</p>
            <p className="about-vaccine-title">
              COVID-19 vaccines be ready for distribution
            </p>
            <div className="factlist">
              {isLoading ? this.renderloader() : this.renderAllData()}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default About
