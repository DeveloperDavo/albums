import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import './GridItem.css'

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

ReactModal.setAppElement('#root')

export default class PhotoGridItem extends React.Component {
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
    const { title, thumbnailUrl } = this.props
    return (
      <div className="GridItem">
        <img onClick={this.handleOpenModal} src={thumbnailUrl} alt={title} />
        <p className="GridItem__title">{title}</p>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="title of photo"
          style={customStyles}
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    )
  }
}

PhotoGridItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired
}
