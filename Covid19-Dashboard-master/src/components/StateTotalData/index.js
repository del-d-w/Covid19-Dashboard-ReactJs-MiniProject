import {Component} from 'react'
import './index.css'

class StateTotalData extends Component {
  state = {
    confirmedData: {},
    activeData: {},
    recoveredData: {},
    deceasedData: {},
  }

  componentDidMount() {
    this.getEachState()
  }

  getEachState = async () => {
    const {eachStateTotalData} = this.props

    const totalConfirmed = eachStateTotalData.confirmed
    const totalRecovered = eachStateTotalData.recovered

    const totalDeceased = eachStateTotalData.deceased

    const totalActive = totalConfirmed - totalRecovered - totalDeceased

    const confirmedData = {
      name: 'Confirmed',
      logo:
        'https://res.cloudinary.com/dzfr8ujso/image/upload/v1650906699/check-mark_1_o3kbj1.png',
      value: totalConfirmed,
    }

    const activeData = {
      name: 'Active',
      logo:
        'https://res.cloudinary.com/dzfr8ujso/image/upload/v1650906741/protection_1_re7mxu.png',
      value: totalActive,
    }

    const recoveredData = {
      name: 'Recovered',
      logo:
        'https://res.cloudinary.com/dzfr8ujso/image/upload/v1650906752/recovered_1_kpsqyj.png',
      value: totalRecovered,
    }
    const deceasedData = {
      name: 'Deceased',
      logo:
        'https://res.cloudinary.com/dzfr8ujso/image/upload/v1650906686/breathing_1_dkacsd.png',
      value: totalDeceased,
    }

    this.setState({
      confirmedData,
      activeData,
      recoveredData,
      deceasedData,
    })
  }

  onGetTotal = value => {
    const {onGetCategory} = this.props
    onGetCategory(value)
  }

  render() {
    const {confirmedData, activeData, recoveredData, deceasedData} = this.state

    const {active} = this.props
    const itsactiveonload = active ? 'confirmed-block' : ''

    return (
      <>
        <ul className="ul-list-eachstate ">
          <li
            className={`category-item ${confirmedData.name} ${itsactiveonload} `}
            tabIndex="-1"
            key={confirmedData.name}
            value={confirmedData.name}
            onClick={() => this.onGetTotal(confirmedData.name)}
          >
            <div testid="stateSpecificConfirmedCasesContainer">
              <p className="stats-title">{confirmedData.name}</p>
              <img
                src={confirmedData.logo}
                alt="state specific confirmed cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{confirmedData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${activeData.name}`}
            tabIndex="-1"
            key={activeData.name}
            value={activeData.name}
            onClick={() => this.onGetTotal(activeData.name)}
          >
            <div testid="stateSpecificActiveCasesContainer">
              <p className="stats-title">{activeData.name}</p>
              <img
                src={activeData.logo}
                alt="state specific active cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{activeData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${recoveredData.name}`}
            tabIndex="-1"
            key={recoveredData.name}
            value={recoveredData.name}
            onClick={() => this.onGetTotal(recoveredData.name)}
          >
            <div testid="stateSpecificRecoveredCasesContainer">
              <p className="stats-title">{recoveredData.name}</p>
              <img
                src={recoveredData.logo}
                alt="state specific recovered cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{recoveredData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${deceasedData.name}`}
            tabIndex="-1"
            key={deceasedData.name}
            value={deceasedData.name}
            onClick={() => this.onGetTotal(deceasedData.name)}
          >
            <div testid="stateSpecificDeceasedCasesContainer">
              <p className="stats-title">{deceasedData.name}</p>
              <img
                src={deceasedData.logo}
                alt="state specific deceased cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{deceasedData.value}</p>
            </div>
          </li>
        </ul>
      </>
    )
  }
}
export default StateTotalData
