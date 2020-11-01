import React ,{Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';


export class ItemModel extends Component {
    state = {
        modal:false,
        name:'',
        url:'',
        priority:'',
        errors:{}
    }

    toggle = ()=>{
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit = (e)=>{
        e.preventDefault();

        const newItem = {
            
            name: this.state.name,
            url: this.state.url
        }

        //Add item via AddItem Action
        this.props.addItem(newItem);

        //Close the model
        this.toggle();

    }
    render() {
        return (
            <div>
                <Button 
                color="dark"
                style={{margin:"2rem"}}
                onClick={this.toggle}>
                Add Item
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add to Item List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input type="text" name="name" id="item" 
                            placeholder="Add an item name" onChange={this.onChange}> 
                            </Input>
                            <Input type="text" name="url" id="item" style={{marginTop:'1rem'}} 
                            placeholder="Add an item url" onChange={this.onChange}> 
                            </Input>
                            <Input type="text" name="priority" id="item" style={{marginTop:'1rem'}} 
                            placeholder="Add an item priority" onChange={this.onChange}> 
                            </Input>
                            <Button color="dark" style={{marginTop:'1rem'}}
                            block>
                            Add Item</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>

                </Modal>
            </div>
        )
    }

}


const mapStateToProps = state =>({
    item:state.item
})

export default connect(mapStateToProps,{addItem})(ItemModel);
