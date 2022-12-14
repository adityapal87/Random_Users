import React, { Component } from "react";
import "./css/index.css";
import Header from "./Header";
import axios from "axios";
import UserList from "./UserList";
import Footer from "./Footer";

class ClassBasedApp extends Component {
  state = {
    users: [],
    isLoading: false,
    errMessage: " ",
    page: 0,
  };

  componentDidMount() {
    this.loadUsers()
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.loadUsers();
    }
  }

  loadUsers = async () => {
    const { page } = this.state  // destructuring the state object
    this.setState({ isLoading: true });
    try {
      let response = await axios.get(`https://randomuser.me/api/?page=${page}&results=10`)
      this.setState((prevState) => ({
        users: [...prevState.users, ...response.data.results]
      }));
    } catch (error) {
      this.setState(
        { errorMsg: "Error while loading data. Try again later.", }
      )
    } finally {
      this.setState({ isLoading: false })
    }
  }



  loadMore = () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 }
    });
  };

  render() {
    const { users, isLoading, errMessage } = this.state; // destructuring the state object
    return (
      <>
        <div className="app-container">
          <Header heading="Random_Users" />
        </div>
        {/* {isLoading && <p className="loader">Loading...</p>} */}
        {errMessage && <p>{errMessage}</p>}
        <UserList users={users} />
        <button className="btn" onClick={this.loadMore}>
          {isLoading ? "Loading.." : "Lode More"}
        </button>
        {!userData.isLoading && <Footer />}

      </>
    );
  }
}

export default ClassBasedApp;
