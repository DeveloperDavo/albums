import React from 'react'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'
import ReactModal from 'react-modal'

import PhotoGridItem from './PhotoGridItem'

ReactModal.setAppElement('#root')

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

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { loading, photos } = this.props

    const gridItems = photos.map(photo => (
      <PhotoGridItem
        key={photo.id}
        title={photo.title}
        thumbnailUrl={photo.thumbnailUrl}
        onClick={this.handleOpenModal}
      />
    ))

    return loading ? (
      <ReactLoading className="loading" type={'spokes'} color={'black'} />
    ) : (
      <>
        <div className="Grid">{gridItems}</div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="title of photo"
          style={customStyles}
        >
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
