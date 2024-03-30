package parsonOnGrails
import grails.compiler.GrailsCompileStatic

import grails.rest.*

@GrailsCompileStatic
@Resource(uri="/problems", readOnly = false, formats = ['json', 'xml'])
class Problem {
    String title
    String description
    String[] problem
    String submitter
    Date datetime

    static constraints = {
        title blank:false
        description blank:false
        problem minSize:1
        submitter blank:false
        datetime blank:false
    }
}