// declare const React: typeof import('react');
import * as React from 'react';
import { Scroller, Loader, Modal, Search } from './component-imports';

export class Main extends React.Component {
  state:any = {
    userList:[],
    loading: true,
    userDetail: null
  };
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.getUserList();
  }

  getUserList = () => {
    if (!this.state.loading) {
      this.setState({loading:true})
    }
    const request:XMLHttpRequest = new XMLHttpRequest();
    request.addEventListener('load', () => {
        const resultList = JSON.parse(request.response);
        this.setState({
          userList: resultList,
          loading: false
        });
    })
    request.open('GET', '/list')
    request.send();
  }

  getUserDetail = (id:string) => {
    if (!this.state.loading) {
      this.setState({loading:true})
    }
    const request:XMLHttpRequest = new XMLHttpRequest();
    request.addEventListener('load', () => {
        this.setState({
          userDetail: request.response,
          loading: false
        });
    })
    request.open('GET', `/person/${id}`)
    request.send();
  }

  openModal = (id) => {
    this.getUserDetail(id);
  }

  searchById = (event) => {
    const search = event.target.value;
    if (event.type !== "keyup" || (event.type === "keyup" && event.key === "Enter")) {
      if (/^[0-9]+$/gm.test(search)) {
        this.openModal(search);
      }
      event.target.value = '';
    }
  }

  closeModal = () => {
    this.setState({
      userDetail: null
    })
  }

  render () {
    return (
      <div>
        <h1>Characters of Star Wars</h1>
        <p>Click on a character name to view information about them, or search by their ID number in the search box in the bottom-right corner</p>
        {this.state.loading ?
         <Loader /> : 
         <Scroller userList={this.state.userList} openModal={(id) => this.openModal(id)} /> }
         {this.state.userDetail ?
         <Modal userDetail={this.state.userDetail} closeModal={this.closeModal}  /> :
         ''}
         <Search searchById={(event) => this.searchById(event)}/>
      </div>
    )
  }
}
