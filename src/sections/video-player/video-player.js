var VideoPlayer = React.createClass({
  render: function() {
    return (
      <div className='content-is-centred'>
        <iframe className='video-player' src={this.props.src} frameBorder="0" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>
      </div>
    )
  }
});