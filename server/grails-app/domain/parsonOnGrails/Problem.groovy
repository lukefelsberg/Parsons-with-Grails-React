package parsonOnGrails


import grails.rest.*

@Resource(uri="/problems", readOnly = false, formats = ['json', 'xml'])
class Problem {
    String id
    String title
    String description
    String[] problem
    String submitter
    Date date

}