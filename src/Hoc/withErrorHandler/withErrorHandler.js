import React from 'react';
import Modal from '../../Components/UI/Modal/Modal'

const withErrorHandler =  (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error : null
        }
        componentDidMount() {
            axios.interceptors.request.use(req => this.setState({error : null}))
            axios.interceptors.response.use(null, error => this.setState({ error }))
            
        }

        componentDidUpdate() {
            console.log(this.state.error)
        }

        render() {
            return (
                <React.Fragment>
                    <Modal
                        clicked={() => this.setState({error: null})}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>

                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            )
        }
    }
}

export default withErrorHandler;