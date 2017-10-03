package business

import (
  "github.com/oli59/activitiz/server/domain"
  "github.com/oli59/activitiz/server/dao"
  "time"
)

func CreateJournallog (a domain.Journallog) domain.Journallog {
  return dao.CreateJournallog(a)
}

func GetJournallogForDate(date time.Time) domain.Journallogs {
  return dao.GetJournallogForDate(date);
}

func GetJournallogForNextDate(date time.Time) domain.Journallogs {
  return dao.GetJournallogForNextDate(date);
}

func UpdateJournallog (jl domain.Journallog) error {
  return dao.UpdateJournallog(jl)
}
