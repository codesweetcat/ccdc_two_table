export const getCollectData = (transformedGenes: any[], numOfTop: number): any[] | undefined => {
    if (!transformedGenes) return;
    transformedGenes.sort((a, b) => b['overall_association_score'] - a['overall_association_score'])
    return transformedGenes.slice(0, numOfTop)

}