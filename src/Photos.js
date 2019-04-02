import React from 'react'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'
import ReactModal from 'react-modal'

import PhotoGridItem from './PhotoGridItem'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

export default class Photos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  render() {
    const { loading, photos } = this.props

    const gridItems = photos.map(photo => (
      <PhotoGridItem
        key={photo.id}
        onClick={this.handleOpenModal}
        title={photo.title}
        thumbnailUrl={photo.thumbnailUrl}
      />
    ))

    return loading ? (
      <ReactLoading className="loading" type={'spokes'} color={'black'} />
    ) : (
      <>
        <div className="Grid">{gridItems}</div>
        <ReactModal isOpen={this.state.showModal} style={customStyles}>
          <button>Close Modal</button>
        </ReactModal>
      </>
    )
  }
}

Photos.propTypes = {
  loading: PropTypes.bool.isRequired,
  photos: PropTypes.array.isRequired
}
