package constants

import "time"

const (
	AtomicRetryLimit = 5
	AtomicRetryWait  = 30 * time.Millisecond
)
