const mongoose = require('mongoose');
const express = require('express');

async function dbconnect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/major_project');
        console.log('Connected To MongoDB');
    }
    catch(error){
        console.log('Error while connecting the database ',error);
    }
}

dbconnect();
module.exports = {dbconnect};