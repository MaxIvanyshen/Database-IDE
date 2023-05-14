package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
)

type UserObject struct {
	Fields map[string] string `json:"fields"`
}

func setData(w http.ResponseWriter, r *http.Request) {
	var p UserObject

	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		fmt.Println("Error decoding")
	}

	fmt.Fprintf(w, "person: %+v", p)
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/mysql_go/set_data", setData)
	log.Fatal(http.ListenAndServe(":8080", router))
}