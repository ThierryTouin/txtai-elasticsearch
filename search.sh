#!/bin/bash
cd manageDatas
echo start createMoviesIndex.js script
#node searchByVector.js "I'm looking for a crime thriller with a very gray future world."
#node searchByVector.js "Je cherche un film avec des scenes violentes et sanguinolantes !"
node searchByVector.js "Je cherche un film retraçant la complicité entre un père et son fils évoluant dans un paysage desert"
