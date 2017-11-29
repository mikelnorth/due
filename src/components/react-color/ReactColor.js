// import React, {Component} from 'react'
// import { CirclePicker } from 'react-color';

// class ReactColor extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//           displayColorPicker: false,
//           background: '#8A2BE2' // Purple
//         };

//         this.handleChangeComplete = this.handleChangeComplete.bind(this);
//     }

//   handleClick = () => {
//     this.setState({ displayColorPicker: !this.state.displayColorPicker })
//   };

//   handleClose = () => {
//     this.setState({ displayColorPicker: false })
//   };

//   state = {
//     background: '#fff',
//   };

//   handleChangeComplete = (color) => {
//     this.setState({ background: color.hex });
//   };

//   render() {
//     const popover = {
//       position: 'absolute',
//       zIndex: '2',
//     }
//     const cover = {
//       position: 'fixed',
//       top: '0px',
//       right: '0px',
//       bottom: '0px',
//       left: '0px',
//     }
//     return (
//       <div>
//         <button onClick={ this.handleClick }>Pick Color</button>
//         { this.state.displayColorPicker ? <div style={ popover }>
//           <div style={ cover } onClick={ this.handleClose }/>
//           <CirclePicker color={ this.state.background }
//             onChangeComplete={ this.props.handleChangeComplete } />
//         </div> : null }
//       </div>
//     )
//   }
// }

// export default ReactColor;