type CapusInfo = {
    campusAcronym: string;
    campusName : string;
};

export const CAMPI: Record<string, CapusInfo> = {
    "userCEAVI":
        {
            "campusAcronym":"CEAVI",
            "campusName":"Centro de Educação Superior do Alto Vale do Itajaí",
        } as CapusInfo,
    "userCCT":
        {
            "campusAcronym": "CCT",
            "campusName": "Centro de Ciências Tecnológicas",
        } as CapusInfo,
    "userCEPLAN":
        {
            "campusAcronym":"CEPLAN",
            "campusName":"Centro de Educação do Planalto Norte",
        } as CapusInfo,
    "userCESMO":
        {
            "campusAcronym":"CESMO",
            "campusName":"Centro de Educação Superior do Meio Oeste",
        } as CapusInfo
}