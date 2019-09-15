const validator=require('validator')
const isEmpty=require('./is-empty')
module.exports=function validExperienceInput(data)
{
    let errors={}
    
    data.title=!isEmpty(data.title )? data.title:'';
    data.company=!isEmpty(data.company )? data.company:'';
    data.from=!isEmpty(data.from )? data.from:'';
  

    
   
    if(validator.isEmpty(data.title))
    {
        errors.title='Job title is invalid'
    }
    if(validator.isEmpty(data.company))
    {
        errors.company='Company field is invalid'
    }
    if(validator.isEmpty(data.from))
   
    {
        errors.from='From data field is required'
    }
    return{
        errors,
        isValid:isEmpty(errors)
    }
}