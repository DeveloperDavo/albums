import React from 'react'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'
import ReactModal from 'react-modal'

import PhotoGridItem from './PhotoGridItem'
import './Modal.css'

const customStyles = {
  content: {
    height: '100%',
    width: '100%',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
    padding: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    border: 'none',
    borderRadius: '0'
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
          <div className="Modal__content__wrapper">
            <div className="Modal__content">
              <div className="Modal__close">
                <img
                  className="Modal__close__img"
                  onClick={this.handleCloseModal}
                  src="/close-button.svg"
                  alt="close button"
                />
              </div>
              <h3 className="Modal__title">{this.state.photoDetailTitle}</h3>
              <img
                className="Modal__photo"
                src={this.state.photoDetailUrl}
                alt="full size"
              />
            </div>
          </div>
        </ReactModal>
      </>
    )
  }
}

Photos.propTypes = {
  loading: PropTypes.bool.isRequired,
  photos: PropTypes.array.isRequired
}
