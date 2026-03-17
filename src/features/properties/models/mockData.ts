import type { Property } from "./type";

export const mockData: Property[] = [
    {
        id: "1",
        key: 'welcome.offer',
        type: 'Boolean',
        value: 'TRUE',
        defaultValue: 'FALSE',
        groupName: 'JAVA',
        description: 'activate the welcome message and email with offer test1',
        status: true,
    },
    {
        id: "2",
        key: 'prop2',
        type: 'String',
        value: 'Make U turn',
        defaultValue: 'Right Turn',
        groupName: 'DATABASE',
        description: 'prop 2 activate the welcome message and email with offer test',
        status: false,
    },
    {
        id: "3",
        key: 'prop3',
        type: 'Integer',
        value: '200',
        defaultValue: '500',
        groupName: 'JAVA',
        description: 'prop 3 activate the welcome message and email with offer',
        status: false,
    },
    {
        id: "4",
        key: 'prop4',
        type: 'String',
        value: 'Stop',
        defaultValue: 'Go',
        groupName: 'UI',
        description: 'prop 4 activate the welcome message and email with offer',
        status: false,
    },
]