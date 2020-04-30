import React from 'react';
import axios from 'axios';

// Move data fetching to parent component and pass data down through the use of props
// Research into redux store for state management

class UniversityList extends React.Component {

    state = {
        loading: true,
        options: [null]
    }

    // componentDidMount function is called once after all the components and subcomponents have been rendered
    // best to make api calls within this react function as given component will have alread been mounted
    // and everything will be available to the DOM.
    async componentDidMount() {
        const response = await axios.get('/api/university');
        // Recieved errors in get reponse, had to convert to string to place in JS object array.
        const string = JSON.stringify(response.data.list);
        const uni = JSON.parse(string);
        // Fills options with JSON request then sets loading to false which can be checked against
        this.setState({ options: uni, loading: false });
        console.log(this.state.options);
    }


    render() {
        return (
            <div>
                {this.state.loading || !this.state.options ? (
                    <div>loading...</div>
                ) : (<div>
                    <select>{
                        // map takes in the recieved university data, for each producing an option for the dropdown
                        this.state.options.map((obj) => {
                            return <option value={obj._id}>{obj.name}</option>
                        }
                        )
                    }</select>
                </div>)}


            </div>
        )
    }
}

export default UniversityList;