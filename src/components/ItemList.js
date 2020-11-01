import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
// import {v4 as uuid} from 'uuid';
import {connect} from 'react-redux';
import {getItems,deleteItem} from '../actions/itemActions';
import propTypes from 'prop-types';


class ItemList extends Component{
    
    onDeleteClick = (id)=>{
        this.props.deleteItem(id);
    }

    
    componentDidMount(){
        this.props.getItems();
    }

    render(){
        const {items} = this.props.item;
        return(
            <Container style={{marginBottom:'10rem'}}>
                

                <ListGroup>
                    <TransitionGroup class="item-list">
                        {items.map(({_id,name,url})=>(
                            <CSSTransition style={GroupStyle} key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                <a href={url} className="linkToApage" target="_blank" rel="noopener noreferrer">{name} </a>
                                   
                                 
                                <div class="remove-btn-div" style={{float:'right',marginLeft:'10px'}}>
                                    <Button 
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={this.onDeleteClick.bind(this,_id)}
                                >&times;</Button>
                                </div>
                                

                                </ListGroupItem>
                                
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

const GroupStyle = {
    marginTop:'10px',
}

ItemList.propTypes={
    getItems:propTypes.func.isRequired,
    item: propTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    item: state.item
})
export default connect(mapStateToProps,
    {getItems,deleteItem})(ItemList);

