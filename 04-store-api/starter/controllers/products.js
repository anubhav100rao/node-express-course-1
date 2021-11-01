const Product = require('../models/product')

const getAllProductsStatic = async(req, res) => {
    console.log(req.query)
    // const products = await Product.find({}).sort('-name price')
    const products = await Product.find({price: {$gt: 30}}).select('name price').limit(5).skip(1)
    res.status(200).json({ products, nhits: products.length })
}

const getAllProducts = async(req, res) => {
    const { featured, company, name, sort, select, numericFilters } = req.query
    const queryObj = {}
    if(featured) {
        queryObj.featured = featured === 'true' ? true: false
    }
    if(company) {
        queryObj.company = company
    }
    if(name) {
        queryObj.name = {$regex: name, $options: 'i'}
    }
    if(numericFilters) {
        console.log(numericFilters)
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': 'eq',
        }
        const regEx = /\b(<|>|>=|<=|=)\b/g
        let filters = numericFilters.replace(regEx, match => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach(item => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)) {
                queryObj[field] = { [operator]: Number(value)}
            }
        })
    }
    console.log(queryObj)
    let result = Product.find(queryObj)
    if(sort) {
        const sortList = sort.split(',').join(" ")
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }
    if(select) {
        const selectList = select.split(',').join(' ')
        result = result.select(selectList)
    }
    
    
    
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const products = await result.skip(skip).limit(limit)
    res.status(200).json({ products, nhits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}