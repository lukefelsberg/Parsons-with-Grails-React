package parsonOnGrails
import grails.compiler.GrailsCompileStatic

import grails.rest.*

@GrailsCompileStatic
@Resource(uri="/solutions", readOnly = false, formats = ['json', 'xml'])
class Solution {
    String problemid
    String[] solution
    String UFID
    Date datetime

    static constraints = {
        problemid blank:false
        solution minSize:1
        UFID blank:false, size:8..8
        datetime blank:false
    }
}