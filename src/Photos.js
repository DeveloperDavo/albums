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
      photoDetailTitle: '',
      photoDetailUrl: '',
      showModal: false
    }
  }

  handleOpenModal = (title, url) => {
    this.setState({
      photoDetailTitle: title,
      photoDetailUrl: url,
      showModal: true
    })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { loading, photos } = this.props

    const gridItems = photos.map(photo => (
      <PhotoGridItem
        key={photo.id}
        onClick={this.handleOpenModal}
        title={photo.title}
        thumbnailUrl={photo.thumbnailUrl}
        url={photo.url}
      />
    ))

    return loading ? (
      <ReactLoading className="loading" type={'spokes'} color={'black'} />
    ) : (
      <>
        <div className="Grid">{gridItems}</div>
        <ReactModal isOpen={this.state.showModal} style={customStyles}>
          <h1>{this.state.photoDetailTitle}</h1>
          <img
            src={this.state.photoDetailUrl}
            alt={this.state.photoDetailTitle}
          />
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </>
    )
  }
}

Photos.propTypes = {
  loading: PropTypes.bool.isRequired,
  photos: PropTypes.array.isRequired
}
