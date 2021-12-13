// declare const React: typeof import('react');
import * as React from 'react';
import { Scroller, Loader, Modal, Search } from './component-imports';
import { callApi } from '../utils/call-api';
import constants from '../../../utils/constants';
import { People } from '../../../utils/types';
import language from '../../../utils/language';

/*
* The root component of the index page
*/
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

  getUserList = ():void => {
    if (!this.state.loading) {
      this.setState({loading:true})
    }
    callApi(constants.api_list, (result:string):void => {
      const resultList:Array<People> = JSON.parse(result);
      this.setState({
        userList: resultList,
        loading: false
      });
    })
  }

  getUserDetail = (id:string) => {
    const path:string = `${constants.api_person}/${id}`
    if (!this.state.loading) {
      this.setState({loading:true})
    }
    callApi(path, (result:string):void => {
      this.setState({
        userDetail: result,
        loading:false
      })
    });
  }

  openModal = (id):void => {
    this.getUserDetail(id);
  }

  searchById = (event:React.KeyboardEvent<HTMLInputElement>|React.FocusEvent<HTMLInputElement>):void => {
    const search:string = event.currentTarget.value;
    if (event.type !== "keyup" || (event.type === "keyup" && event['key'] === "Enter")) {
      if (/^[0-9]+$/gm.test(search)) {
        this.openModal(search);
      }
      event.currentTarget.value = '';
    }
  }

  closeModal = ():void => {
    this.setState({
      userDetail: null
    })
  }

  render () {
    const loader = (loading:boolean):JSX.Element => {
      if (loading) {
        return <Loader />;
      }
      else {
        return;
      }
    }
    const scroller = (userList:Array<People>):JSX.Element => {
      if (userList && userList.length > 0) {
        return <Scroller 
          userList={userList}
          openModal={(id) => this.openModal(id)}
        />
      }
      else {
        return;
      }
    }
    const modal = (userDetail:string):JSX.Element => {
      if (userDetail) {
        return <Modal
          userDetail={userDetail}
          closeModal={this.closeModal}
        />
      }
      else {
        return;
      }
    }
    return (
      <div>
        <h1>{language.site_title}</h1>
        <p>{language.site_subtitle}</p>
        {loader(this.state.loading)}
        {scroller(this.state.userList)}
        {modal(this.state.userDetail)}
        <Search searchById={(event:React.KeyboardEvent<HTMLInputElement>|React.FocusEvent<HTMLInputElement>) => this.searchById(event)}/>
      </div>
    )
  }
}
