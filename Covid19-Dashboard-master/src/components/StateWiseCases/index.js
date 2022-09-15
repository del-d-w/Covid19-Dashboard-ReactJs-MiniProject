import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'
import ShowEachDistrictData from '../ShowEachDistrictData'
import StateTotalData from '../StateTotalData'
import ChartsData from '../ChartsData'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class StateWiseCases extends Component {
  state = {
    eachStateTotalData: [],
    isLoading: true,
    totalTestedData: 0,
    nameOfState: '',
    activeTab: true,
    category: 'Confirmed',
    id: '',
    dataarray: [],
    date: '',
    stateCode: '',
  }

  componentDidMount() {
    this.getAllStateData()
  }

  getAllStateData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const apiUrl = `https://apis.ccbp.in/covid19-state-wise-data/`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const stateTastedData = data[stateCode].total.tested
      const stateObject = statesList.filter(
        each => each.state_code === stateCode,
      )
      const eachState = data[stateCode].total
      const stateName = stateObject[0].state_name

      const datedata = new Date(data[stateCode].meta.last_updated)

      this.setState({
        eachStateTotalData: eachState,
        totalTestedData: stateTastedData,
        nameOfState: stateName,
        isLoading: false,
        id: stateCode,
        dataarray: data,
        date: datedata,
        stateCode,
      })
    } else {
      console.log('Fetch Error')
    }
  }

  onGetCategory = categoryVal => {
    this.setState({category: categoryVal, activeTab: false})
  }

  renderLoadingView = () => (
    <div
      className="products-details-loader-container"
      testid="stateDetailsLoader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getCategoryWiseData = () => {
    const {category, id, dataarray} = this.state
    const districtOutput = dataarray[id].districts
    const distNamesList = Object.keys(districtOutput)
    const categoryLower = category.toLowerCase()

    const categoryData = distNamesList.map(element => ({
      distName: element,
      value: districtOutput[element].total[categoryLower]
        ? districtOutput[element].total[categoryLower]
        : 0,
    }))

    categoryData.sort((a, b) => b.value - a.value)

    const activeCases = distNamesList.map(element => ({
      distName: element,
      value:
        districtOutput[element].total.confirmed -
        (districtOutput[element].total.recovered +
          districtOutput[element].total.deceased)
          ? districtOutput[element].total.confirmed -
            (districtOutput[element].total.recovered +
              districtOutput[element].total.deceased)
          : 0,
    }))
    activeCases.sort((a, b) => b.value - a.value)

    if (categoryLower === 'active') {
      return activeCases
    }
    return categoryData
  }

  renderStateView = () => {
    const {
      nameOfState,
      totalTestedData,
      eachStateTotalData,
      activeTab,
      date,
      category,
      stateCode,
    } = this.state
    const catdata = this.getCategoryWiseData()

    return (
      <div className="state-details">
        <div className="state-name-row">
          <h1 className="state-name-container">{nameOfState}</h1>
          <div className="testno-container">
            <p className="test-title">Tested</p>
            <p className="testno">{totalTestedData}</p>
          </div>
        </div>
        <div>
          <p className="last-date">{`last update on ${date}`}</p>
        </div>
        <div className="align-center-row">
          <div className="country-stats">
            <StateTotalData
              onGetCategory={this.onGetCategory}
              eachStateTotalData={eachStateTotalData}
              active={activeTab}
            />
          </div>
        </div>

        <div className="total-district-data-block">
          <h1 className={`district-heading ${category}-color`}>
            Top Districts
          </h1>
          <div className="ul-parent-list">
            <div className="district-data-ul-list">
              <ul
                className="districts-container"
                testid="topDistrictsUnorderedList"
              >
                {catdata.map(each => (
                  <ShowEachDistrictData
                    key={each.distName}
                    number={each.value}
                    name={each.distName}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="graphs-data" testid="lineChartsContainer">
            <ChartsData stateCode={stateCode} category={category} />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    const renderData = isLoading
      ? this.renderLoadingView()
      : this.renderStateView()
    return (
      <div className="main-container">
        <Header />
        <div className="container">{renderData}</div>
      </div>
    )
  }
}

export default StateWiseCases
