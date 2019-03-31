import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

export default function withItemFetcher(WrappedComponent, fetchItems) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        empty: false,
        error: false,
        items: [],
        loading: false
      }
    }

    getItems = () => {
      const { location } = this.props
      const { start, limit } = queryString.parse(location.search)
      if (!isNaN(start) && !isNaN(limit)) {
        this.setState({ loading: true, empty: false, error: false, items: [] })
        fetchItems(this.props)
          .then(response => {
            if (response.data.length === 0) this.setState({ empty: true })
            this.setState({
              items: response.data,
              loading: false
            })
          })
          .catch(error => this.setState({ error: true, loading: false }))
      }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.location.search !== prevProps.location.search) {
        this.getItems()
      }
    }

    componentDidMount() {
      this.getItems()
    }

    render() {
      const { empty, error, items, loading } = this.state
      return (
        <WrappedComponent
          {...this.props}
          empty={empty}
          error={error}
          items={items}
          loading={loading}
        />
      )
    }
  }
}

withItemFetcher.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
}
