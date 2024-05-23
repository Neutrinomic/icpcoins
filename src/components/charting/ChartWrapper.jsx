import {
    Box,
} from '@chakra-ui/react';

export default function ChartWrapper(props) {
    const { title, children } = props;
    return (
        <Box sx={{ position: 'relative', paddingTop: 4, marginTop: 4 }}>
            <Box
                sx={{
                    position: 'absolute',
                    left: '0px',
                    top: '-8px',
                    fontSize: '12px',
                }}
                color="gray.500"
            >
                {title}
            </Box>
            {children}
        </Box>
    );
}