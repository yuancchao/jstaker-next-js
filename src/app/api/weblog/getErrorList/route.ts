import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client"
import { deleteParamsIsNotNull } from "../../../utils/apiUtils";


const prisma = new PrismaClient();

export const OPTIONS = (req: NextRequest, res: NextResponse) => {
    // res.status(200).send(); // 响应 OPTIONS 请求
    const response = NextResponse.json({
        success: true,
        errorMessage: '',
        data: {}
    });

    response.headers.set('Access-Control-Allow-Origin', '*'); // 允许任何来源的请求
    response.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE'); // 允许的 HTTP 方法
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头

    return response;
};
export const GET = async (
    req: NextRequest
) => {
    const searchParams = req.nextUrl.searchParams;
    const params: error_information_data = {
        id: searchParams.get('id') ? Number(searchParams.get('id')) : null,
        type: searchParams.get('type') ? Number(searchParams.get('type')) : null,
        errorPageUrl: searchParams.get('errorPageUrl'),
        errorFunctionParams: searchParams.get('errorFunctionParams'),
        errorFunction: searchParams.get('errorFunction'),
        message: searchParams.get('message'),
        projectName: searchParams.get('projectName'),
        startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate') || 1) : undefined,
        endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate') || 1) : undefined,
        ip: searchParams.get('ip'),
        token: searchParams.get('token')
    };
    if (params.id) {
        params.id = Number(params.id);
    }
    if (params.type) {
        params.type = Number(params.type);
    }
    function buildWhereCondition(params: error_information_data ) {
        const whereCondition: WhereCondition = {};
        Object.keys(params).forEach(key => {
            // 如果参数不为空或未定义，则添加到查询条件中
            if (params[key] !== null && params[key] !== undefined) {
                if (["errorPageUrl", "errorFunctionParams", "projectName"].includes(key)) {
                    // 用模糊搜索处理特定的字符串字段
                    whereCondition[key] = { contains: params[key] };
                } else {
                    // 直接添加其他类型的条件
                    whereCondition[key] = params[key];
                }
            }
        });
    
        // 特殊处理日期范围
        if (params.startDate || params.endDate) {
            whereCondition.createdAt = {};
            if (params.startDate) whereCondition.createdAt.gte = new Date(params.startDate);
            if (params.endDate) whereCondition.createdAt.lte = new Date(params.endDate);
        }
    
        return whereCondition;
    }
    

    
    const whereCondition = buildWhereCondition(params);
    

    await prisma.$connect();
    const data = await prisma.error_information.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' }
    });
    await prisma.$disconnect();
    return NextResponse.json({
        success: true,
        errorMessage: '',
        data: { data }
    })
}

export interface WhereCondition {
    [key: string]:any
}
export interface error_information_data {
    id: number | null;
    errorFunction: string | null;
    errorPageUrl: string | null;
    errorFunctionParams: string | null;
    projectName: string | null;
    uid?: string | null;
    type: number | null;
    message: string | null;
    [property: string]: any;
}

export const POST = async (
    req: NextRequest,
    { params }: any
) => {
    return NextResponse.json({
        success: true,
        errorMessage: '',
        data: {}
    })
}
