import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import React, { FunctionComponent, useState } from "react";
import "./app.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App: FunctionComponent = () => {
    const [state, setState] = useState({
        dateEnglish: "",
        dateNepali: ""
    });

    return (
        <div className="container">
            <Header />

            <form>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="start-date">Date <small>Selected: {state.dateEnglish}</small></label>
                                <NepaliDatePicker
                                    pickerPlacement={'bottom-start'}
                                    value={state.dateEnglish}
                                    onChange={(date: string) => setState(prevState => {
                                        return {
                                            ...prevState,
                                            dateEnglish: date
                                        };
                                    })}
                                    options={{ calenderLocale: "en" }} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="end-date">मिति <small>Selected: {state.dateNepali}</small></label>
                                <NepaliDatePicker
                                    pickerPlacement={'bottom-start'}
                                    value={state.dateNepali}
                                    onChange={(date: string) => setState(prevState => {
                                        return {
                                            ...prevState,
                                            dateNepali: date
                                        };
                                    })}
                                    options={{ valueLocale: "en" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <Footer />
        </div>
    );
};

export default App;
