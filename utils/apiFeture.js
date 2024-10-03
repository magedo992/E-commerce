
class ApiFeture{
    constructor(mongoQuery,query)
    {
        this.mongoQuery=mongoQuery;
        this.query=query;
    } 
    pagination(queryCount){
        const page=this.query.page||1;
        const limit=this.query.limit||10;
        const skip=(page-1)*limit;
        const EndIndex=page*limit;
        let pagination={};
        pagination.CurrentPage=page;
        pagination.limit=limit;
        pagination.numberOfPages=Math.ceil(queryCount/limit);


        this.paginationResult=pagination;
        this.mongoQuery=this.mongoQuery.skip(skip).limit(limit);
        return this;
    }

    sort() {

        if (this.query.sort) {
            const Sortby = this.query.sort.split(',').join(' ');
            this.mongoQuery = this.mongoQuery.sort(Sortby);
        } else {
            this.mongoQuery = this.mongoQuery.sort({ createdAt: -1 });
        }
        return this
    }
    search(modelName) {
        if (this.query.keyword) {
            let query = {};
            if (modelName === "Products") {
                query.$or = [
                    {
                        title: {
                            $regex: this.query.keyword,
                            $options: "i",
                        },
                    },
                    {
                        description: {
                            $regex: this.query.keyword,
                            $options: "i",
                        },
                    },
                ];
            } else {
                query = {
                    name: {
                        $regex: this.query.keyword,
                        $options: "i",
                    },
                };
            }
    
            this.mongooseQuery = this.mongoQuery.find(query);
        }
        return this;
    }
    
}

module.exports=ApiFeture;