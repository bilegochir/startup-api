const mongoose = require('mongoose');
const { makeExecutableSchema } = require('graphql-tools')
const Companies = require('../model/Company')
const Projects = require('../model/Project')

mongoose.connect('mongodb://localhost:27017/startup_db');

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function () {
    console.log('MongoDB connected.')
})

const prepare = (o) => {
    o._id = o._id.toString()
    return o
}

const typeDefs = [`
    type Query {
        getCompanies(search: String): [Companies]
        getCompany(_id: ID): Companies
        getProjects(company: ID): [Projects]
        getProject(_id: ID): Projects
    }
    type Companies {
        _id: ID
        name: String
        abn: String
        description: String
        phone: String
        location: String
        category: String
        subcategory: String
        email: String
        password: String
    }
    type Projects {
        _id: ID
        name: String
        start_date: String
        description: String
        company: String
    }
    type Mutation {
        createCompany(
            name: String
            abn: String
            description: String
            phone: String
            location: String
            category: String
            subcategory: String
            email: String
            password: String
        ): Companies
        createProject(
            name: String
            start_date: String
            description: String
            company: String
        ): Projects
    }
    schema {
        query: Query
        mutation: Mutation
    }
`];

const resolvers = {
    Query: {
        getCompanies(_, args) {
            if (args.search != '')
                return Companies.find({
                    $or: [
                        { "name": { "$regex": args.search, "$options": "i" } },
                        { "description": { "$regex": args.search, "$options": "i" } },
                        { "category": { "$regex": args.search, "$options": "i" } },
                        { "subcategory": { "$regex": args.search, "$options": "i" } },
                        { "location": { "$regex": args.search, "$options": "i" } }
                    ]
                })
            return Companies.find({})
        },
        getCompany(_, args) {
            return Companies.findOne({ _id: args._id });
        },
        getProjects(_, args) {
            return Projects.find({ "company": args.company })
        },
        getProject(_, args) {
            return Projects.findOne({ _id: args._id });
        }
    },
    Mutation: {
        createCompany(_, args) {
            const comp = new Companies(args)
            return new Promise((resolve, object) => {
                comp.save((err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(comp)
                    }
                })
            })
        },
        createProject(_, args) {
            const proj = new Projects(args)
            return new Promise((resolve, object) => {
                proj.save((err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(proj)
                    }
                })
            })
        }
    },
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

module.exports = schema
