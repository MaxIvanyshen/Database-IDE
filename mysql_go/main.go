package main

import (
	"fmt"
	"database/sql"
	_"github.com/go-sql-driver/mysql"
)

type User struct {
    Name string `json:"name"`
    Age   int    `json:"age"`
}

func main() {
	fmt.Println(GetData())
}

func GetData() User {
	db, err := sql.Open("mysql", "max:sqlmax@tcp(127.0.0.1:3306)/test_db")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	// Execute the query
    results, err := db.Query("SELECT * FROM data WHERE name = 'Max' AND age = 16")
    if err != nil {
        panic(err.Error()) // proper error handling instead of panic in your app
    }

    for results.Next() {
        var tag User
        // for each row, scan the result into our tag composite object
        err = results.Scan(&tag.Name, &tag.Age)
        if err != nil {
            panic(err.Error()) // proper error handling instead of panic in your app
        }
                // and then print out the tag's Name attribute
        return tag
    }
	return User {}
}