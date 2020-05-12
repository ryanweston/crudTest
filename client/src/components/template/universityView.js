import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import '../../Buttons.css';

class UniversityView extends React.Component {

    close = () => {
        this.props.handleModalOpen(null);
    }

    render() {

        return (
            (!this.props.currentState ? (<div></div>) : (<Fragment>
                <div className="overlay">
                    <button onClick={this.close}>X</button>
                    <h1>{this.props.details.name}</h1>
                    <br />
                    <label>📈 <b>Total:</b></label>
                    <p>{this.props.details.scores.total.toFixed(2)} / 5</p>
                    <div>
                        <label>🍻 Nightlife: </label>
                        <progress className="progress" value={this.props.details.scores.nightlife.toFixed(2)} max="5.00"> </progress>
                        <p>{this.props.details.scores.nightlife.toFixed(2)} / 5</p>
                        <label>😆 Happiness: </label>
                        <progress className="progress" value={this.props.details.scores.happiness.toFixed(2)} max="5.00"> </progress>
                        <p>{this.props.details.scores.happiness.toFixed(2)} / 5</p>
                        <label>🌎 Internet: </label>
                        <progress className="progress" value={this.props.details.scores.internet.toFixed(2)} max="5.00"> </progress>
                        <p>{this.props.details.scores.internet.toFixed(2)} / 5</p>
                    </div>
                </div>
            </Fragment>))
        )
    }
}

export default UniversityView;