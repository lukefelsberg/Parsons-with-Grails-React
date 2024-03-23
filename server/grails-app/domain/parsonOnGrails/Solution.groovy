package parsonOnGrails


import grails.rest.*

@Resource(uri="/solutions", readOnly = false, formats = ['json', 'xml'])
class Solution {
    String problemid
    String[] solution
    String UFID
    Date datetime
}