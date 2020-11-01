import React ,{Component} from 'react';
import validator from 'validator'
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
    constructor(props){
       super(props);

       this.state = {
           modal:false,
           fields: {},
           errors: {}
       }
    }
    
    toggle = ()=>{
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e)=>{
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;       
        this.setState({fields});
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //name validator since this works for one word, I want to validate a string of words
        //don't do this at home
        //https://github.com/validatorjs/validator.js/issues/796
        const nameContent = fields["name"].split(' ');
        for(var word of nameContent){
            if(!validator.isAlpha(word)){
            formIsValid = false;
            errors["name"] = fields["name"]+" not a valid name";
            break;
            }
        }

        
        //url validator
        if(!validator.isURL((fields["url"]))){
            formIsValid = false;
            errors["url"] = fields["url"]+" not a valid URL";
        }

        if(!validator.isInt((fields["priority"]),{ min: 0, max: 10 })){
            formIsValid = false;
            errors["priority"] = fields["priority"]+" not a valid priority";
        }
  
       this.setState({errors: errors});
       const validation = {
           formIsValid:formIsValid,
           errors: errors
       }
       return validation; 
   }

    onSubmit = (e)=>{
        e.preventDefault();

        const validation = this.handleValidation();

        if(validation.formIsValid){

        const newItem = {
            name: this.state.fields.name,
            url: this.state.fields.url,
            priority:this.state.fields.priority,
        }
        this.props.addItem(newItem);
        this.toggle(); // close the model after submitting
        //alert("Form submitted with success!");
        }else{
        alert("Form has errors: "+JSON.stringify(validation.errors))
        }
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
