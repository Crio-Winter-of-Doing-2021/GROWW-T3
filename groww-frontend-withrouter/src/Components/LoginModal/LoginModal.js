import React from 'react';

const loginModal = (props) => {

    //POST Request
    const submitHandler = () => {

        let emailIdUser = document.getElementById('inputEmail').value;
        let passwordUser = document.getElementById('inputPassword').value;

        fetch('https://groww-bot-backend.herokuapp.com/v1/user/login', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                    email_id: emailIdUser, password: passwordUser,
            })
        })
            .then(r => r.json())
                .then(data => {
                    console.log(data);
                    let userId = data['user_account_id'];

                    let closeBtn = document.getElementById("closeBtn");
                    closeBtn.click();

                    props.loginGetUserHandler(userId);

                })
                .catch((error) => {
                    console.log(error);
                });

        // let modal = document.getElementById('loginModal');
        // modal.hide();

    }

    return(

        <div className="modal" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="loginModalLongTitle">LOGIN</h5>
                        <button type="button" className="btn close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <form>
                            <div className="form-group">
                                <label htmlFor="inputEmail">Email address</label>
                                <input type="email" className="form-control" id="inputEmail"
                                       placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPassword">Password</label>
                                <input type="password" className="form-control" id="inputPassword"
                                       placeholder="Password"  />
                            </div>
                        </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" id = "closeBtn" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" id="submitbtn" className="btn btn-primary" onClick={submitHandler}>Submit</button>
                    </div>
                </div>
            </div>
        </div>


    );

}

export default loginModal;