package dao

func checkErr(err error) {
  if err != nil {
    panic(err)
  }
}

func AddToWhereClause(whereclause string, param string) string {
  if whereclause == "" {
    return "WHERE " + param;
  }
  return whereclause + "AND " + param;

}
